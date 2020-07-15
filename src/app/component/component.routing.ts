import { Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'movies',
				component: ProductComponent,
				data: {
					title: 'Movies',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Movies' }
					]
				}
			},
			{
				path: 'product/product-form',
				component: ProductFormComponent,
				data: {
					title: 'Add Products',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Products' }
					]
				}
			}
			
		]
	}
];
