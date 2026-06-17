import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content_columns_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_content_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_content_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_locales" CASCADE;
  ALTER TABLE "pages_blocks_content_columns_links" ADD CONSTRAINT "pages_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_links_locales" ADD CONSTRAINT "pages_blocks_content_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_links" ADD CONSTRAINT "_pages_v_blocks_content_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_links_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_links_order_idx" ON "pages_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_links_parent_id_idx" ON "pages_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_content_columns_links_locales_locale_parent_id_" ON "pages_blocks_content_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_links_order_idx" ON "_pages_v_blocks_content_columns_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_links_parent_id_idx" ON "_pages_v_blocks_content_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_columns_links_locales_locale_parent_" ON "_pages_v_blocks_content_columns_links_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_content_columns_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_content_columns_links" CASCADE;
  DROP TABLE "pages_blocks_content_columns_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_links" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_links_locales" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_content_columns_locales" ADD CONSTRAINT "pages_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_content_columns_locales_locale_parent_id_unique" ON "pages_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_columns_locales_locale_parent_id_uni" ON "_pages_v_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_pages_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_links_link_appearance";`)
}
