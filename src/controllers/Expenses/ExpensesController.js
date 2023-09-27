const DataModel = require('../../models/Expenses/ExpensesModel')
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const DropDownService = require("../../services/common/DropDownService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");

exports.CreateExpenses = async (req, res)=>{
    let Result = await CreateService(req,DataModel)
    res.status(200).json(Result)
}

exports.UpdateExpenses = async (req, res)=>{
    let Result = await UpdateService(req,DataModel)
    res.status(200).json(Result)
}


exports.ExpensesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{Name: SearchRgx},{'Type.Name': SearchRgx}];
    let JoinStage= {$lookup: {from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type"}}
    let Result= await ListOneJoinService(req,DataModel,SearchArray, JoinStage)
    res.status(200).json(Result)
}


exports.ExpenseTypesDropDown=async (req, res) => {
    let Result= await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result)
}