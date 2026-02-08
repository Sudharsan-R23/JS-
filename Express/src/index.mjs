import express from 'express';

const App = express();

const PORT = 3000;

const SysDatas = [
    {"id":1, "Name": "Acer"},
    {"id":2, "Name": "Hp"},
    {"id":3, "Name": "Dell"},
    {"id":4, "Name": "Msi"}
];

App.get('/', (req, res)=>{
    res.send({"index":404})
});

App.get('/system/:id', (req, res)=>{
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


})

App.listen(PORT, ()=>{
    console.log(`Server Listen Port:${PORT}`);
});