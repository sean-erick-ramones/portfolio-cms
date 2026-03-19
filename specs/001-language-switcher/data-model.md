# Data Model

## Entity: LanguageOption

**Purpose**: Represents one selectable language in the site header and routing layer.

**Fields**:
- `code`: stable locale identifier such as `en` or `es`
- `name`: display label shown in the locale selector
- `language`: full BCP 47 language tag used for formatting and metadata
- `dir`: text direction metadata
- `isDefault`: whether the locale is the default route behavior

**Validation Rules**:
- `code` must be unique across the application
- Exactly one language option must be marked as default
- Only `en` and `es` are valid in this feature scope

**Relationships**:
- One `LanguageOption` maps to many `LocalizedContentDocument` instances
- One `LanguageOption` can be stored by one `LocalePreference`

## Entity: LocalePreference

**Purpose**: Represents the visitor's active language choice for the current browser.

**Fields**:
- `activeCode`: currently selected language code
- `source`: whether the value came from the default configuration or an explicit visitor selection
- `persisted`: whether the choice has been stored for future visits

**Validation Rules**:
- `activeCode` must match a supported `LanguageOption.code`
- Invalid stored values must be normalized to `en`

**State Transitions**:
- `default/en` -> `explicit/es` when the visitor changes language
- `explicit/es` -> `explicit/en` when the visitor switches back
- `invalid/*` -> `default/en` during normalization

## Entity: LocaleMessageCatalog

**Purpose**: Stores application-shell message keys for shared interface copy.

**Fields**:
- `locale`: locale code
- `messages`: hierarchical key/value map for UI text
- `coverageStatus`: whether the catalog is complete for planned keys

**Validation Rules**:
- English catalog must define every required key
- Spanish catalog may omit keys only when English fallback is acceptable
- Keys must be stable across locales to avoid runtime lookup gaps

**Relationships**:
- One `LocaleMessageCatalog` belongs to one `LanguageOption`
- UI components consume entries from the active `LocaleMessageCatalog`

## Entity: LocalizedContentDocument

**Purpose**: Represents a locale-specific YAML or Markdown content document used by Nuxt Content.

**Fields**:
- `locale`: locale code for the document
- `collectionType`: content group such as home page, about page, blog page metadata, blog post, or project entry
- `path`: public content path used by the route layer
- `sourcePath`: filesystem path under the locale folder
- `contentKey`: stable identifier shared across locale variants of the same document
- `body`: authored content and structured fields
- `metadata`: SEO and display metadata

**Validation Rules**:
- English documents are required for every production route
- Spanish documents should mirror the English structure when localized
- `contentKey` must be unique within a collection type
- Schema shape must remain consistent across locale variants of the same document

**Relationships**:
- Many `LocalizedContentDocument` instances belong to one `LanguageOption`
- Localized blog lists, page metadata, and project listings are composed from sets of `LocalizedContentDocument` records

## Entity: LocalizedRoute

**Purpose**: Represents a visitor-facing route and its locale-specific URL behavior.

**Fields**:
- `locale`: locale code
- `basePath`: logical path without locale prefix
- `resolvedPath`: visitor-facing path after locale strategy is applied
- `canonicalPath`: canonical URL used for SEO
- `fallbackLocale`: locale used if current-locale content is missing

**Validation Rules**:
- Default locale paths must remain unprefixed
- Non-default locale paths must use the configured locale prefix
- Canonical path must reflect the active locale and resolved route

**Relationships**:
- One `LocalizedRoute` resolves to zero or one `LocalizedContentDocument`
- Search and navigation use `LocalizedRoute` to avoid cross-locale leakage
