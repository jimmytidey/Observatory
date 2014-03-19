Template.sourceTypesList.helpers({
    sourceTypes: function() {
        console.log(SourceTypes.find().count());
        return SourceTypes.find();
        
    }
});

