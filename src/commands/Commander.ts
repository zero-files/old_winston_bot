class Commander {
  public static async run(){
    console.log("ola bebe");
  }
}

Commander.run()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
