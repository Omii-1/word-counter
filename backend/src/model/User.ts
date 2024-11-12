import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, Default, HasMany } from "sequelize-typescript"
import { Text } from "./Text";

@Table ( {
    tableName: User.USER_TABLE_NAME
})

export class User extends Model {
    public static USER_TABLE_NAME = "user" as string;
    public static USER_ID = "id" as string;
    public static USER_NAME = "userName" as string;
    public static USER_EMAIL = "email" as string;
    public static USER_PASSWORD = "password" as string;
    public static USER_TEXTS = "texts" as string;
    public static USER_ROLE = "role" as string;


    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: User.USER_ID,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: User.USER_NAME,
    })
    userName!: string;

    @Column({
        type: DataType.STRING(100),
        field: User.USER_EMAIL,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING(255),
        field: User.USER_PASSWORD,
    })
    password!: string;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER), // Array of integers to store text IDs
        allowNull: true,
        defaultValue: [],
        field: User.USER_TEXTS,
    })
    texts!: number[];

    @Default("user")
    @Column({
        type: DataType.STRING(50),
        field: User.USER_ROLE,
    })
    role!: string;

    // Association: One User has many Texts
    @HasMany(() => Text, { foreignKey: "userId" })
    textsList!: Text[];
}

