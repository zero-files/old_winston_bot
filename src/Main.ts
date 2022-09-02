
class Main {
  public static async main():Promise<void> {
    console.log("ola bebe");
  }
}

Main.main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
