import express from 'express';
import morgan from 'morgan';

const App = express();

const PORT = 3000;

const SysDatas = [
    {"id":1, "name": "Acer"},
    {"id":2, "name": "Hp"},
    {"id":3, "name": "Dell"},
    {"id":4, "name": "Msi"}
];


App.get('/api/system', (req, res)=>{
    const {filter,value} =req.query;
    if(filter && value){
        return res.send(SysDatas.filter(((datas)=>datas[filter].toLowerCase().includes(value))));
    }
    else{
        return res.send(SysDatas);
    }

});
App.use(express.json());

App.get('/api/system/:id', (req, res)=>{
    const id = Number(req.params.id);
    if(isNaN(id)){
       return res.status(404).send("It's not an Number");
    }

    const datas = SysDatas.find((inf)=> inf.id === id);

    if(datas){
        res.send(datas);
    }
    else{
        res.status(404).send("Data Not Find");
    };
});

App.put('/api/system/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id < 0) {
        return res.status(400).send('Invalid ID');
    }

   
    const index = SysDatas.findIndex(data => data.id === id);

    if (index === -1) {
        return res.status(404).send('Data not found');
    }

    const updatedData = {
        id: id,
        ...req.body
    };

    SysDatas[index] = updatedData;

    res.status(200).json({
        message: "Updated successfully",
        data: updatedData
    });
});
 
App.listen(PORT, ()=>{
    console.log(`Server Listen Port:${PORT}`);
});