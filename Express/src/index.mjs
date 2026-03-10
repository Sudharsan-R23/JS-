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
    const id = parseInt(req.params.id);
    if(isNaN(id)){
       return res.status(404).send("It's not an Number");
    }

    const datas = SysDatas.find((inf)=> inf.id === id);

    if(datas){
        res.send(datas);
    }
    else{
        res.status(404).send("Data Not Find");
    }
});

App.put('/api/system/:id',(req,res)=>{
    const param_id = parseInt(req.params.id);
    if(isNaN(param_id) || param_id === -1){
        res.status(404).send('id is not valied');
    }
    
    const Index = SysDatas.findIndex((FindData)=>FindData.id === param_id);
    const {Body_id,Name} = req;
    console.log(Index);

    res.status(201).send("updater");
})
 
App.listen(PORT, ()=>{
    console.log(`Server Listen Port:${PORT}`);
});