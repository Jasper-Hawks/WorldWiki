
let rootDirHandle; //The root directory handle is the handle for the directory that the world directory is in
let subDirHandle; //The sub directory handle is the handle for the world itself

async function selDirectory(){


    rootDirHandle = await window.showDirectoryPicker();
    if (rootDirHandle.kind === "directory"){

        console.log(typeof(rootDirHandle));
        console.log("Directory provided");
        return rootDirHandle;

    }else{
        //TODO This is impossible at least on my file manager. We should add a modal just in case
        //the user is able to select a file.

        console.log("Come back to this");

    }

}

async function createWorld(){
    let worldName = document.querySelector("#worldName");
    worldName = worldName.value;
    console.log("World name is " + worldName);

    try{

        //TODO first get the directory without creating it. So that we can check if it's there
        //If it isn't prompt the user with a modal asking them if they'd like to create the world
//        subDirHandle = rootDirHandle.getDirectoryHandle(worldName,{ create: true }).then((subDir) => subDir.getDirectoryHandle("entries",{create: true}));
        subDirHandle = await rootDirHandle.getDirectoryHandle(worldName,{ create: true });
    }catch{


        //TODO The directory wont be generated if we get an error.
        console.log("TODO Come back for error handling");

    }

    openWorld(subDirHandle,worldName)
}
// Eventually edit create a world so that users can open previous worlds
// Eventually add a list of opened worlds in the index html file
async function openWorld(worldDirHandle){

    //TODO Remove this we'll just pass the world name

    //Auto open world after creation, only run this function for new worlds
    let worldName = document.querySelector("#worldName");
    worldName = worldName.value;

    //Generate files and directories for the world
    entryDirHandle = await worldDirHandle.getDirectoryHandle("entries",{create: true});



    indexFileHandle = await worldDirHandle.getFileHandle(worldName + "Index.html",{create: true});
    const writeFile = await indexFileHandle.createWritable();

    await writeFile.write(`

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="worldStyleTemplate.css">
    <title>New World Index Page</title>
  </head>
  <body>
      <header>
          <h1>Welcome to your world's index page</h1>
          <hr>
      </header>
      <p>This is the index page of your world. You'll see all of your entires compiled into one place. Along with all the general data about your world.</p>
  </body>
</html>


    `);

    await writeFile.close();
/*    async function writeFile(fileHandle, contents) {
      // Create a FileSystemWritableFileStream to write to.
      const writable = await fileHandle.createWritable();

      // Write the contents of the file to the stream.
      await writable.write(contents);

      // Close the file and write the contents to disk.
      await writable.close();
    }
    */


}
