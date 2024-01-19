import Visitor from '../models/visitor.js'
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



//  data of visitor //

export const register = async (req, res) => {
    try {
        //  data get form user //
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        // convert password to hashPassword //
        const hashPassword = await bcrypt.hash(req.body.password, 10);


        const newVisitor = await new Visitor({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        // saved data //
        const savedVisitor = await newVisitor.save();

        // filter data //
        const { password: hidePassword, ...filtered_data } = savedVisitor.toJSON();


        // create TOKEN //
        const token = await jwt.sign({ email: newVisitor.email, id: newVisitor._id }, process.env.ACCESS_TOKEN_SECRET);


        // response //
        res.status(200).json({
            message: 'ok',
            data: filtered_data,
            token: token
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    };

};


// GET ALL VISITORS //

export const visitors_Get = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        return res.status(200).json({
            message: "ok",
            data: visitors
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};


// GET SPACIFIC VISITOR //


export const visitor_Get_By_Id = async (req, res) => {
    try {
        // const { id } = useparams()
        const visitor = await Visitor.findById(req.params.id);
        if (visitor) {
            return res.status(200).json({
                message: "ok",
                data: visitor
            })

        } else {
            return res.status(404).json({
                status: "visitor not found. ",
                message: "Pls try again",

            })

        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};


// UPDATE DAT OF VISITOR //

export const update_data = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, { $set: req.body });
        const updated_data = await Visitor.findById(req.params.id);
        return res.status(200).json({
            status: "ok",
            message: "data updated",
            data: updated_data
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

export const delete_data = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: "ok",
            message: "data deleted",
            data: visitor
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};


// LOGIN VISITOR BY EMAIL && PASSWORD //

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isVisitor = await Visitor.findOne({ email: email });

        if (!isVisitor) {
            return res.status(404).json("Wrong email or password");
        };


        // isVisitor.password= get passwor from visitor witch want to login.
        // password = get password from database.
        // const isMatch = await bcrypt.compare(password, "$2b$10$hzO9p2w15JQvesYed8Q38OB0eZdAbOoAp4du9hqNYEaj0ft6NpILy")
        const isMatch = await bcrypt.compare(password, isVisitor.password)

        if (!isMatch) {
            return res.status(404).json("Wrong email or password");
        };

        return res.status(200).json({
            status: "ok",
            message: "you are loggedin"
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    };
};



// VERIFY THE TOKEN //

export const verifyToken = async (req, res, next) => {
    console.log('called');
    const visitorHeader = await req.headers["authorization"];
    console.log(visitorHeader);
    const token = visitorHeader && visitorHeader.split(' ')[1];
    console.log(token);

    if (token == null) {
        return res.status(404).json({
            ok: false,
            message: 'Forbidden1'
        });
    };
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'forbidden2',
                err
            });
        };
        return res.status(200).json({
            ok: true,
            message: "virified",
            payload,
        });
    });
}