import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class NoteCategory extends Model {
  declare note_id: string;
  declare category_id: string;
}

NoteCategory.init(
  {
    note_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'NoteCategory',
    tableName: 'note_categories',
    timestamps: false,
  }
);

export default NoteCategory;
