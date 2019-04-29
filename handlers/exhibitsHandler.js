//import mongoose models
let Exhibit = require('../models/exhibits');
let Image = require('../models/image');


exports.getSingleExhibit = function(req, res, next){

    Exhibit.findOne({_id: req.params.id}, function (exhibit, err) {
        if (err){
            return res.json(err)
        }


        res.json(exhibit)

    })
};




exports.getExhibits = function (req, res, next) {

    Exhibit.find({}, function (exhibits, err) {
        if(err){
            console.log(err)
            return res.json(err)
        }

        res.json(exhibits)


    })





};


exports.updateExhibit = function (req, res, next) {

    const id = req.params.id;
    let exhibit = {}
    exhibit.mainImg= {};
    exhibit.appSections = []

    const files = req.files;
    const body = req.body;

    for(prop in body){
        console.log('p',prop)
        body[prop] = JSON.parse(body[prop])
    }


    console.log(body)
    console.log(files)

    exhibit.name = body.name;
    exhibit.subHead = body.subHead;
    exhibit.mainImg.altText = body.mainImg.altText;
    exhibit.mainImg.newImage = false;

    exhibit.published = body.published;


    if(files.length> 0){
    for(let i =0; i< files.length; i++){

        if(files[i].fieldname === 'newExhibitMainImage'){

            const path = files[i].path

            var x = files[i].path.split('/');

            var arrayLength = x.length;

            var wantedArray = x.slice(arrayLength - 3, arrayLength);

            var usablePath = wantedArray.join('/');





            exhibit.mainImg.path = `/${usablePath}`;


        }else{
            exhibit.mainImg.path = body.mainImg.path
        }


    }
    }else{
        exhibit.mainImg.path = body.mainImg.path
    }


   // App Sections Add

    if(body.appSections.length> 0){
        //find if image exisits for section

        for(let section in body.appSections){
            console.log('section', body.appSections[section])

            if(body.appSections[section].newImage){
                let newImageUpload = files.find(function (file) {
                    return file.fieldname === `newExhibitMainImage-${section}`

                })

                const path = newImageUpload.path

                var sectionPathArray = path.split('/');

                var sectionPathArrayLength = sectionPathArray.length;

                var sectionPathWantedArray = sectionPathArray.slice(sectionPathArrayLength - 3, sectionPathArrayLength);

                var sectionPath = sectionPathWantedArray.join('/');


                exhibit.appSections.push({
                    sectionHeading: body.appSections[section].sectionHeading,
                    sectionImagePath: `/${sectionPath}`,
                    sectionImageAltText: body.appSections[section].sectionImageAltText,
                    sectionDescription: body.appSections[section].sectionDescription,
                    order: body.appSections[section].order,
                    newImage: false
                });

            }else{
                exhibit.appSections.push({
                    sectionHeading: body.appSections[section].sectionHeading,
                    sectionImagePath: body.appSections[section].sectionImagePath,
                    sectionImageAltText: body.appSections[section].sectionImageAltText,
                    sectionDescription: body.appSections[section].sectionDescription,
                    order: body.appSections[section].order,
                    newImage: false
                });
            }
        }

        //



    }











    //End APP Sections
    delete  exhibit._id
    console.log("e", exhibit)

    Exhibit.findOneAndUpdate({_id: id}, exhibit, {new:true}, function (err, exhibit) {
        if (err){
            throw err;
        }

        res.json(exhibit);

    } )


}




function recursiveFormData(requestObj, files, exhibitObj){


    let count = 1;
    console.log("WTF");
    for(let key in requestObj){
        let matchKey = `newExhibitSubhead-${count}`;

        if(key == matchKey ){

            let sectionHeadingKey = `newExhibitSubHead-${count}`;
            let altTextKey = `newExhibitAltText-${count}`;
            let descriptionKey = `newExhibitDescription-${count}`;
            let imageKey = `newExhibitMainImage-${count}`;


            let imagePath = files.find(function (x) {

                if(x.fieldname === imageKey){

                    const imagePath= x.path;

                    const arrayPath = imagePath.split('/');
                    const arrayLength = arrayPath.length;
                    const wantedArray = arrayPath.slice(arrayLength - 3, arrayLength);
                    const usablePath = wantedArray.join('/');




                    return x.useablePath = `/${usablePath}`;
                }

            });




            exhibitObj.appSections.push({
                sectionHeading: requestObj[`newExhibitSubhead-${count}`],
                sectionImagePath: imagePath.useablePath,
                sectionImageAltText: requestObj[`newExhibitAltText-${count}`],
                sectionDescription: requestObj[`newExhibitDescriptionText-${count}`],
                order: count - 1,
                newImage: false
            });

            count ++;


        }


    }
    return exhibitObj

}


exports.newExhibit = function (req, res, next) {


    let exhibit = new Exhibit();

    const files = req.files;
    const body = req.body;
    console.log(body);
    console.log(files);

    exhibit.name = body.newExhibitName;
    exhibit.subHead = body.newExhibitSubhead;
    exhibit.mainImg.altText = body.newExhibitAltText;
    exhibit.mainImg.newImage = false;

    exhibit.published = body.published;



    for(let i =0; i< files.length; i++){

        if(files[i].fieldname === 'newExhibitMainImage'){

            const path = files[i].path

            var x = files[i].path.split('/');

            var arrayLength = x.length;

            var wantedArray = x.slice(arrayLength - 3, arrayLength);

            var usablePath = wantedArray.join('/');





            exhibit.mainImg.path = `/${usablePath}`;


        }


    }


    exhibit = recursiveFormData(body, files, exhibit);

    exhibit.save(function (err) {
        if(err){
            return err;
        }else{
            res.send('exhibit saved')
        }

    })
    

};



exports.deleteExhibit = function (req, res, next) {
    
    
    const idToDelete = req.params.id;
    
    Exhibit.findOneAndDelete({_id: idToDelete}, function (err, exhibit) {

        if(err){
            throw err
        }


        res.send(exhibit)
        
    })
    
}


exports.deleteAppSection = function (req, res, next) {

    const idToDelete = req.params.id;



}