const logModel=require('../Model/logModel.js');


const getData = async (req, res) => {
    const condition = req.body;
    console.log(condition);

    try {
        let query = {};

        // Iterate over each key in the condition object
        Object.keys(condition).forEach(key => {
            console.log(key)
            // Special handling for the timestamp range
            if (key === 'timestampStart') {
                console.log(condition.timestampEnd)
                if (condition.timestampEnd) {
                    query.timestamp = {
                        $gte: new Date(condition.timestampStart),
                        $lte: new Date(condition.timestampEnd)
                    };
                }
            } else if (key !== 'timestampEnd') {
                // Add conditions for each key
                query[key] = condition[key];
            }
        });
        const getData = await logModel.find(query);
        res.status(200).json(getData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const addData =async(req,res)=>{
const data=req.body;
try{
    const dataAdd=await logModel.insertMany(data);
    res.status(200).json(dataAdd);
}

catch(err){
    console.log(err)
    res.status(500).json({error:err.message});
}
}


module.exports={addData,getData};