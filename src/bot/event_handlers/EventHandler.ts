export default interface EventHandler {
    event:string,
    handle:(...args:any[]) => Promise<void>
}
