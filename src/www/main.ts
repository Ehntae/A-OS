
import Program from "./scripts/Framework/Program";


function main():void {
	
	// Setup accurate timing from 0 (runTime: Time since the page has loaded)
    let startTime = new Date().getTime();
    // Time since start
    let runTime = function() {
        return new Date().getTime() - startTime;
    };

	// Instansiate the Program singleton
	let program = new Program();
	program.init();
	program.run();

}

main();