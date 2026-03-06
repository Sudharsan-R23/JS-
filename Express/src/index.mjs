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
App.use(express.json);

App.post('/api/system',(req,res)=>{
    console.log(req.body);
    res.status(201).send("suscess")
})
App.get('api/system/:id', (req, res)=>{
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

App.listen(PORT, ()=>{
    console.log(`Server Listen Port:${PORT}`);
});