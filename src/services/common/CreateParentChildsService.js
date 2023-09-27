const mongoose = require("mongoose");
const CreateParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try {
        // Begin Transaction
        await session.startTransaction();

        // 1st Database Process
        let Parent= Request.body['Parent'];
        Parent.UserEmail= Request.headers['email'];
        let ParentCreation = await ParentModel.create([Parent],{session});

        // 2nd Database Process
        let Childs=Request.body['Childs'];
        await Childs.forEach((element)=>{
            element[JoinPropertyName]= ParentCreation[0]['_id'];
            element['UserEmail']= Request.headers['email'];
        });

        let ChildCreation = await ChildsModel.insertMany(Childs,{session});

        // Transaction Success
        await session.commitTransaction();
        session.endSession();

        return {status: "success", Parent: ParentCreation, Childs: ChildCreation}

    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", data: error}

    }

}

module.exports = CreateParentChildsService;