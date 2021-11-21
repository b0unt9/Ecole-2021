const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const {customAlphabet} = require("nanoid");
const nanoid = customAlphabet('123456789', 10);

const app = express();
const port = process.env.PORT || 3000;

const gameSchema = require('./database/game');
// const memberSchema = require('./database/member');
const roomSchema = require('./database/room');

const admin = require('firebase-admin');

let serAccount = require('./gameroom-792ac-firebase-adminsdk-0d8g2-2f18e1ddc3.json');

admin.initializeApp({
    credential: admin.credential.cert(serAccount),
})

app.use(bodyParser.json());

app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action: 'sameorigin'}));
app.use(helmet.noSniff());
app.use(helmet.dnsPrefetchControl({allow: true}));
app.use(helmet.ieNoOpen());

app.use(express.static('public', {extensions: ['html']}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'ejs');

const databaseUrl = "mongodb+srv://user:167943@cluster0.ajdlr.mongodb.net"

mongoose.connect(databaseUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log('Connected to MongoDB Server');
});


async function getId() {
    let id = null;

    while (1) {
        id = await nanoid();
        if (await roomSchema.exists({id})) continue;
        else break;
    }

    return id;
}

// 방 리스트 (필터 처리)
app.get('/list', (req, res) => {
    // let filter = req.body.filter;
    // let page = req.body.page;
    // roomSchema.find(filter).sort({createdAt: 1}).skip(page * 20).limit(20).then((data) => {
    //     return res.status(200).json(data);
    // })
    roomSchema.find({}).sort({createdAt: -1}).limit(10).then((data) => {
        return res.status(200).json(data);
    });
})

// 방 세부 정보 가져오기
app.post('/info', async (req, res) => {
    console.log(req.body);
    let roomData = await roomSchema.findOne({id: req.body.id})
    if (!roomData) {
        return res.status(404).json({
            status: "failure",
            code: "notExistRoom"
        })
    }

    let owner = (req.body.fcm === roomData.fcm) ? Boolean(true) : Boolean(false);

    return res.status(200).json({
        status: "success",
        id: roomData.id,
        members: roomData.members,
        game: roomData.game,
        tier: roomData.tier,
        owner
    })
})

// 방 생성
app.post('/create', async (req, res) => {
    // let roomData = await roomSchema.find({fcm: req.body.fcm, activate: true})
    // console.log(roomData);
    // if (roomData.length !== 0) {
    //     return res.status(404).json({
    //         status: "failure",
    //         code: "existActiveRoom"
    //     })
    // }

    console.log(req.body);
    if (!req.body.nickname || !req.body.game || !req.body.tier || !req.body.fcm ) {
        return res.status(404).json({
            status: "failure",
            code: "EmptyValue"
        })
    }

    let id = await getId();
    let roomModel = new roomSchema();

    roomModel.id = id;
    roomModel.members = [req.body.nickname];
    roomModel.game = req.body.game;
    roomModel.tier = req.body.tier;
    roomModel.fcm = req.body.fcm;

    await roomModel.save();

    return res.status(200).json({
        status: "success",
        id: roomModel.id,
        members: roomModel.members,
        game: roomModel.game,
        tier: roomModel.tier
    });
})

// 방 마감
app.post('/deadline', async (req, res) => {
    let roomData = await roomSchema.findOne({id: req.body.id})
    if (!roomData) {
        return res.status(404).json({
            status: "failure",
            code: "notExistRoom"
        })
    }

    if (req.body.fcm !== roomData.fcm) {
        return res.status(404).json({
            status: "failure",
            code: "notRoomOwner"
        })
    }

    roomData.activate = false;

    await roomData.save();

    return res.status(200).json({
        status: "success"
    })
})

// 방에 들어가기
app.post('/join', async (req, res) => {
    let roomData = await roomSchema.findOne({id: req.body.id});

    if (!roomData) {
        return res.status(404).json({
            status: "failure",
            code: "notExistRoom"
        })
    }

    if (roomData.members.includes(req.body.nickname)) {
        return res.status(404).json({
            status: "failure",
            code: "alreadyJoin"
        })
    }

    roomData.members.push(req.body.nickname);

    await roomData.save();

    let message = {
        data: {
            title: ``,
            body: ``,
            style: ``
        },
        token: roomData.fcm
    }

    admin.messaging().send(message).then((response) => {
        console.log(`success send message ${response}`);
        return res.status(200).json({
            status: "success"
        })
    }).catch((err) => {
        console.error(`failure send message ${err}`)
    })
})

// 방에서 킥
app.post('/kick', async (req, res) => {
    let roomData = await roomSchema.findOne({id: req.body.id})

    if (!roomData) {
        return res.status(404).json({
            status: "failure",
            code: "notExistRoom"
        })
    }

    if (req.body.fcm !== roomData.fcm) {
        return res.status(404).json({
            status: "failure",
            code: "notRoomOwner"
        })
    }

    if (!roomData.members.includes(req.body.nickname)) {
        return res.status(404).json({
            status: "failure",
            code: "notRoomMember"
        })
    }

    roomData.members.splice(roomData.members.indexOf(req.body.nickname), 1);

    await roomData.save();

    return res.status(200).json({
        status: "success"
    })
})


app.listen(port, () => {
    console.log("server start");
});
