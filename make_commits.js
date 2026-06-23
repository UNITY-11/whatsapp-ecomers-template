const { execSync } = require('child_process');

function run(cmd) {
  try {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed: ${cmd}`);
  }
}

// 1. Move to src and Base App
run('git add apps/admin/tsconfig.json');
run('git add apps/admin/app/layout.tsx apps/admin/app/page.tsx apps/admin/app/globals.css apps/admin/app/favicon.ico');
run('git add apps/admin/src/app/layout.tsx apps/admin/src/app/page.tsx apps/admin/src/app/globals.css apps/admin/src/app/favicon.ico');
run('git commit -m "chore: Move base Next.js files to src directory"');

// 2. Shared module
run('git add apps/admin/components apps/admin/lib');
run('git add apps/admin/src/shared');
run('git commit -m "refactor: Setup shared module for components and lib in FSD"');

// 3. Orders Feature
run('git add apps/admin/app/orders apps/admin/sanity/schemas/orderRequest.ts');
run('git add apps/admin/src/app/orders apps/admin/src/features/orders');
run('git commit -m "feat(orders): Refactor Orders to Feature-Driven Architecture"');

// 4. Customers Feature
run('git add apps/admin/app/customers apps/admin/sanity/schemas/customer.ts');
run('git add apps/admin/src/app/customers apps/admin/src/features/customers');
run('git commit -m "feat(customers): Refactor Customers to Feature-Driven Architecture"');

// 5. Products Feature
run('git add apps/admin/app/products apps/admin/sanity/schemas/product.ts');
run('git add apps/admin/src/app/products apps/admin/src/features/products');
run('git commit -m "feat(products): Refactor Products to Feature-Driven Architecture"');

// 6. Reviews Feature
run('git add apps/admin/app/reviews');
run('git add apps/admin/src/app/reviews apps/admin/src/features/reviews');
run('git commit -m "feat(reviews): Refactor Reviews to Feature-Driven Architecture"');

// 7. Categories Feature
run('git add apps/admin/app/categories apps/admin/sanity/schemas/category.ts');
run('git add apps/admin/src/app/categories apps/admin/src/features/categories');
run('git commit -m "feat(categories): Refactor Categories to Feature-Driven Architecture"');

// 8. Sanity config updates
run('git add apps/admin/sanity');
run('git add apps/admin/src/sanity');
run('git commit -m "refactor(sanity): Update Sanity configuration and schemas for FSD"');

// Any remaining files
run('git add -A');
run('git commit -m "chore: Finalize FSD migration"');
