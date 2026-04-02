<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('orders', 'orders/index')->name('orders.index');
    Route::inertia('orders/place', 'orders/place')->name('orders.place');
    Route::inertia('quotes', 'quotes/index')->name('quotes.index');
    Route::inertia('clients', 'clients/index')->name('clients.index');
    Route::inertia('employees', 'employees/index')->name('employees.index');
    Route::inertia('chatbot-configuration', 'chatbot-configuration/index')->name('chatbot-configuration.index');
    Route::inertia('reports', 'reports/index')->name('reports.index');
    Route::inertia('integrations', 'integrations/index')->name('integrations.index');
});

require __DIR__.'/settings.php';
