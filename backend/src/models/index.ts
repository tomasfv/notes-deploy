import Note from './Note';
import Category from './Category';
import NoteCategory from './NoteCategory';

// Associations
Note.belongsToMany(Category, { through: NoteCategory, foreignKey: 'note_id', otherKey: 'category_id' });
Category.belongsToMany(Note, { through: NoteCategory, foreignKey: 'category_id', otherKey: 'note_id' });

export { Note, Category, NoteCategory };
