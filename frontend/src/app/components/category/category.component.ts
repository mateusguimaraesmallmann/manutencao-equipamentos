import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'categories-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  showForm = false;
  editMode = false;
  categoryForm: Category = { id: 0, name: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  newCategory() {
    this.editMode = false;
    this.categoryForm = { id: 0, name: '' };
    this.showForm = true;
  }

  editCategory(category: Category) {
    this.editMode = true;
    this.categoryForm = { ...category };
    this.showForm = true;
  }

  saveCategory() {
    if (this.editMode) {
      this.categoryService.updateCategory(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.cancel();
      });
    } else {
      this.categoryService.addCategory(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.cancel();
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('Deseja excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.categoryForm = { id: 0, name: '' };
    this.editMode = false;
  }
}
