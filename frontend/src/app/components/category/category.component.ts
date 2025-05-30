import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models';
import { CategoryService } from '../../services/category.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'categories-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: Category = { id: 0, name: '' };
  editMode = false;

  modal!: Modal;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();

    // Espera o DOM carregar para inicializar o modal
    setTimeout(() => {
      const modalElement = document.getElementById('categoryModal');
      if (modalElement) {
        this.modal = new Modal(modalElement);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  openModal(isEdit: boolean, category?: Category) {
    this.editMode = isEdit;
    this.categoryForm = isEdit && category ? { ...category } : { id: 0, name: '' };
    this.modal.show();
  }

  saveCategory() {
    if (this.editMode) {
      this.categoryService.updateCategory(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.modal.hide();
      });
    } else {
      this.categoryService.addCategory(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.modal.hide();
      });
    }
  }

  deleteCategory(id: number | null) {
    if (id === null) return;
    if (confirm('Deseja excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
