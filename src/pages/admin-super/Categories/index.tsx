import { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';
import { categoryService } from '../../../services/categoryService';

export default function SuperAdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    categoryService.initializeMockCategories();
    setCategories(categoryService.getAllCategories());
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState({ name: '', slug: '' });

  const handleAddCategory = () => {
    categoryService.addCategory({ name: newCategory.name, slug: newCategory.slug, icon: '📁' });
    setCategories(categoryService.getAllCategories());
    setShowAddModal(false);
    setNewCategory({ name: '', slug: '' });
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      categoryService.deleteCategory(id);
      setCategories(categoryService.getAllCategories());
    }
  };

  const handleEditCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setEditingCategoryId(id);
      setEditCategory({ name: category.name, slug: category.slug });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingCategoryId !== null) {
      categoryService.updateCategory(editingCategoryId, { name: editCategory.name, slug: editCategory.slug });
      setCategories(categoryService.getAllCategories());
      setShowEditModal(false);
      setEditingCategoryId(null);
      setEditCategory({ name: '', slug: '' });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Category Management</h1>
          <p className="text-gray-600">Create, edit, and manage product categories</p>
        </div>

        {/* Add Category Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddModal(true)}>+ Add Category</Button>
        </div>

        {/* Add Category Modal */}
        {showAddModal && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <div className="space-y-4">
              <Input
                label="Category Name"
                placeholder="e.g., Electronics"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <Input
                label="Slug"
                placeholder="e.g., electronics"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddCategory}>Create Category</Button>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {showEditModal && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <div className="space-y-4">
              <Input
                label="Category Name"
                placeholder="e.g., Electronics"
                value={editCategory.name}
                onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
              />
              <Input
                label="Slug"
                placeholder="e.g., electronics"
                value={editCategory.slug}
                onChange={(e) => setEditCategory({ ...editCategory, slug: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Slug</th>
                  <th className="text-left p-4">Products</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{category.id}</td>
                    <td className="p-4 font-medium">{category.name}</td>
                    <td className="p-4 text-gray-600">{category.slug}</td>
                    <td className="p-4">{category.productCount}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        {category.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleEditCategory(category.id)}>Edit</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
