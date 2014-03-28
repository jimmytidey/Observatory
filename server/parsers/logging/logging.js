parser.logging = {};

parser.logging.start = function(source_id, message) {
    var log_entry = {
        type: 'start',
        time: new Date().getTime(),
        source_id: source_id, 
        message: message
    }

    ScrapeLog.insert(log_entry);
}    

parser.logging.success = function(source_id, message) {
    var log_entry = {
        type: 'success',
        time: new Date().getTime(),
        source_id: source_id, 
        message: message
    }

    ScrapeLog.insert(log_entry);
}