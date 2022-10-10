const Task=require('../Models/Task')

const createTask = async (req, res) =>{
    
    const {title, description,type,start_time,end_time} = req.body;
   

    var countdownend=new Date(Date.parse(end_time)).getTime()
    var countdownbegin=new Date(Date.now(start_time)).getTime()
    var countdown=countdownend-countdownbegin;

    const newTask = new Task({
        title: title,
        description : description,
        type:type,
        start_time:start_time,
        end_time:end_time,
        duration:Math.floor((countdown%(60*60*1000))/(1000*60)),
       
       
       
        userId : req.userId
    });

    try {
        
        await newTask.save();
        res.status(201).json(newTask);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
    
}






const getTasks = async (req, res) =>{
    try {
        
        const tasks = await Task.find({userId : req.userId});
        res.status(200).json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getFilteredTasks = async (req, res) =>{
    
    try {
        const tasks=await Task.find({userId : req.userId,start_time:req.body.start_time});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports.createTask = createTask;
module.exports.getTasks = getTasks;
module.exports.getFilteredTasks=getFilteredTasks;