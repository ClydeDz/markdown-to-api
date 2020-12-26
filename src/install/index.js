const tl = require("azure-pipelines-task-lib/task");

function run() {
    try {  
        var args = new Array();
        args.push("install");
        args.push("-g"); 
        args.push("processmd"); 
        tl.exec("npm", args);
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();