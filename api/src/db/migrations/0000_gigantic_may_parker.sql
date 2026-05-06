CREATE TABLE `coffee_bags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roaster` text,
	`origin` text,
	`variety` text,
	`process` text,
	`farm` text,
	`producer` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
