import Note from './Note';
import Category from './Category';
import NoteCategory from './NoteCategory';

// Associations
Note.belongsToMany(Category, { through: NoteCategory, foreignKey: 'note_id', otherKey: 'category_id', as: 'categories' });
Category.belongsToMany(Note, { through: NoteCategory, foreignKey: 'category_id', otherKey: 'note_id', as: 'notes' });

export { Note, Category, NoteCategory };
