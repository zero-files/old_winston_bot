export default interface Repository<Entity> {
    id:string;
    get_all(): Promise<Entity[]>;
    get(id:string): Promise<Entity|null>;
    create(entity:Entity): Promise<void>;
    update(entity:Entity): Promise<void>;
    delete(id:string): Promise<void>;
}
