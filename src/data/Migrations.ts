import { BaseDataBase } from "./BaseDataBase"

class Migrations extends BaseDataBase {
    async createTable() {
        await BaseDataBase.connection.raw(`
            create table if not exists Amaro_Product(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
            
            create table if not exists Amaro_Tag(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
            
            create table if not exists Amaro_Product_Tag(
                id_product VARCHAR(255),
                id_tag VARCHAR(255),
                primary key(id_product , id_tag),
                foreign key (id_product) references Amaro_Product(id),
                foreign key (id_tag) references Amaro_Tag(id)
            );
        `)
        console.log("Tables created successfully!")
    }
}

const createTableMigrations = new Migrations()
createTableMigrations.createTable()