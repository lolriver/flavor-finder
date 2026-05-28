import React, { useState } from 'react';
import { Star, CreditCard as Edit3, Trash2, Plus, X } from 'lucide-react';
import { RecipeNote } from '../types/recipe';

interface RecipeNotesProps {
  recipeId: number;
  notes: RecipeNote[];
  onAddNote: (note: Omit<RecipeNote, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, note: string, rating: number) => void;
  onDeleteNote: (id: string) => void;
  darkMode: boolean;
}

export const RecipeNotes: React.FC<RecipeNotesProps> = ({
  recipeId,
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  darkMode
}) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');
  const [editRating, setEditRating] = useState(5);

  const recipeNotes = notes.filter(note => note.recipeId === recipeId);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote({
        recipeId,
        note: newNote,
        rating: newRating
      });
      setNewNote('');
      setNewRating(5);
      setShowAddNote(false);
    }
  };

  const handleEditNote = (note: RecipeNote) => {
    setEditingId(note.id);
    setEditNote(note.note);
    setEditRating(note.rating);
  };

  const handleUpdateNote = () => {
    if (editingId && editNote.trim()) {
      onUpdateNote(editingId, editNote, editRating);
      setEditingId(null);
      setEditNote('');
      setEditRating(5);
    }
  };

  const renderStars = (rating: number, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => onRatingChange?.(star)}
            className={`${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors duration-200`}
            disabled={!onRatingChange}
          >
            <Star size={16} fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`p-6 rounded-xl ${
      darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          My Notes & Rating
        </h3>
        <button
          onClick={() => setShowAddNote(true)}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          <Plus size={14} />
          Add Note
        </button>
      </div>

      {recipeNotes.length === 0 ? (
        <p className={`text-center py-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          No notes yet. Add your first note and rating!
        </p>
      ) : (
        <div className="space-y-4">
          {recipeNotes.map(note => (
            <div
              key={note.id}
              className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-600/50 border-gray-500' : 'bg-white border-gray-200'
              }`}
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border resize-none ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    rows={3}
                  />
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Rating:
                    </span>
                    {renderStars(editRating, setEditRating)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateNote}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {renderStars(note.rating)}
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-1 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {note.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showAddNote && (
        <div className={`mt-4 p-4 rounded-lg border ${
          darkMode ? 'bg-gray-600/50 border-gray-500' : 'bg-white border-gray-200'
        }`}>
          <div className="space-y-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add your notes about this recipe..."
              className={`w-full px-3 py-2 rounded-lg border resize-none ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              rows={3}
            />
            <div className="flex items-center gap-4">
              <span className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Rating:
              </span>
              {renderStars(newRating, setNewRating)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Add Note
              </button>
              <button
                onClick={() => setShowAddNote(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};