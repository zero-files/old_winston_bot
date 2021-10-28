export default interface Repository<Entity> {
    get_all(): Promise<Entity[]>;
    get(id:string): Promise<Entity>;
    create(entity:Entity): Promise<void>;
    update(entity:Entity): Promise<void>;
    delete(id:string): Promise<void>;
}
