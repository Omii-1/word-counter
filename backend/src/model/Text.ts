import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript"

import { User } from "./User"

@Table({
    tableName: Text.TEXT_TABLE_NAME
})

export class Text extends Model {
    public static TEXT_TABLE_NAME = "text" as string;
    public static TEXT_ID = "id" as string;
    public static TEXT_USER_ID = "userId" as string;
    public static TEXT_TITLE = "title" as string;
    public static TEXT_DESCRIPTION = "description" as string;

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: Text.TEXT_ID
    })
    id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: Text.TEXT_USER_ID
    })
    userId!: number;

    @Column({
        type: DataType.STRING(255),
        field: Text.TEXT_TITLE
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        field: Text.TEXT_DESCRIPTION
    })
    description!: string;

    // Association: A Text belongs to one User
    @BelongsTo(() => User, { foreignKey: "userId" })
    user!: User;
}
