import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';

class Note extends Model {
  declare id: string;
  declare title: string;
  declare content: string;
  declare archived: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
  }
);

export default Note;
