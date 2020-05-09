const parameter_model = require('./parameter_model')

// HELPERS

const parameter_data = (req) => {
    let data = {
        tool_name: req.body.tool_name,
        material_name: req.body.material_name,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate,
};
return data;
};

// CREATE

const api_post_parameter = (req, res, next) => {
    console.log('api_post_parameter');
    let data = parameter_data(req);

    let new_material = parameter_model(data);

    new_material.save().then(() => {
        console.log(new_material);
        res.send(JSON.stringify(new_material));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

    console.log(data);
    res.send(JSON.stringify(data));

};

// READ ONE

const api_get_parameter = (req, res, next) => {
    let id = req.params.id;
    console.log('api_get_parameter');

    parameter_model.findById(id)
        .lean()
        .then(material => {
        res.send(JSON.stringify(material));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// READ ALL

const api_get_parameters = (req, res, next) => {
    console.log('api_get_parameters');

    parameter_model.find({})
    .lean()
    .then(materials => {
        res.send(JSON.stringify(materials));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// UPDATE

const api_put_parameter = (req, res, next) => {
    let id = req.params.id;
    let data = parameter_data(req);

    parameter_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((material) => {
        res.send(material);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// DELETE

const api_delete_parameter = (req, res, next) => {
    let id = req.params.id;

    parameter_model.findByIdAndRemove(id).then(()=>{
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
});
// };

};

// EXPORTS
module.exports.api_post_parameter = api_post_parameter;
module.exports.api_get_parameter = api_get_parameter;
module.exports.api_get_parameters = api_get_parameters;
module.exports.api_delete_parameter = api_delete_parameter;
module.exports.api_put_parameter = api_put_parameter;