# 🌿 Naturo

Un site français pour afficher des produits naturels, avis et témoignages, avec un dashboard minimaliste pour la gestion.

## 🛠️ Stack technique

- **Next.js 16** - App Router avec Server Actions
- **TypeScript** - Typage statique
- **TailwindCSS + DaisyUI** - Styling avec palette verte personnalisée
- **Prisma 7** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données (Docker)
- **Supabase Storage** - Stockage d'images produits (optionnel)
- **pnpm** - Gestionnaire de paquets

## 🚀 Installation

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Configurer l'environnement

Copier `.env.example` vers `.env` et configurer :

```bash
cp .env.example .env
```

**Important:** Assurez-vous que `DATABASE_URL` est défini dans `.env` :

```env
DATABASE_URL="postgresql://naturo:naturo_secret@localhost:5432/naturo_db?schema=public"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Lancer PostgreSQL avec Docker

```bash
docker-compose up -d
```

### 4. Initialiser la base de données

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Lancer le serveur de développement

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### 6. Build de production

```bash
pnpm build
pnpm start
```

## 📁 Structure du projet

```
src/
├── app/
│   ├── (public)/           # Pages publiques
│   │   ├── page.tsx        # Accueil
│   │   ├── produits/       # Liste et détail produits
│   │   └── contact/        # Formulaire de contact
│   └── dashboard/          # Dashboard admin (protégé)
│       ├── login/          # Page de connexion
│       ├── products/       # CRUD produits
│       ├── categories/     # CRUD catégories
│       ├── testimonies/    # CRUD témoignages
│       ├── messages/       # Gestion messages
│       └── author/         # Profil auteur
├── actions/                # Server Actions
├── components/             # Composants React
│   ├── ui/                 # Composants UI réutilisables
│   ├── product/            # Composants produits
│   └── forms/              # Formulaires
├── data/
│   └── author.json         # Données auteur + mot de passe
├── lib/                    # Utilitaires (Prisma, Supabase, Auth)
└── types/                  # Types TypeScript
```

## 🔐 Authentification

Le dashboard est protégé par un mot de passe stocké dans `src/data/author.json`.

**Mot de passe par défaut:** `naturo2024`

Accéder au dashboard : [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login)

## 🎨 Personnalisation du thème

Le thème utilise une palette verte personnalisée définie dans :
- `src/app/globals.css` - Variables CSS et thème DaisyUI
- Couleurs principales : `#28a745` (vert naturo)

### Mode sombre

Le mode sombre est automatiquement géré. Utilisez le bouton dans la navbar pour basculer.

## 📦 Fonctionnalités

### Pages publiques
- ✅ Accueil avec section auteur, produits populaires et témoignages
- ✅ Catalogue produits avec filtres (catégorie, prix, recherche)
- ✅ Page produit détaillée avec avis
- ✅ Formulaire de contact
- ✅ Bouton WhatsApp avec tracking des clics

### Dashboard
- ✅ CRUD Produits (avec toggle stock)
- ✅ CRUD Catégories
- ✅ CRUD Témoignages
- ✅ Gestion Messages (marquer comme lu, supprimer)
- ✅ Édition profil auteur
- ✅ Statistiques WhatsApp

### Autres
- ✅ Mode sombre/clair
- ✅ SEO optimisé
- ✅ Design responsive
- ✅ Calcul automatique des notes moyennes
- ✅ Animations et effets visuels

## 🗄️ Modèles de données

Voir `prisma/schema.prisma` pour le schéma complet.

### Modèles principaux :
- **Category** - Catégories de produits
- **Product** - Produits avec images, prix, stock, notes
- **ProductReview** - Avis clients sur les produits
- **Testimony** - Témoignages clients
- **Message** - Messages de contact
- **WhatsAppClick** - Tracking des clics WhatsApp

## 🐛 Résolution de problèmes

### Erreur Prisma Client
Si vous rencontrez des erreurs liées à Prisma, assurez-vous que :
1. `DATABASE_URL` est défini dans `.env`
2. La base de données PostgreSQL est démarrée (`docker-compose up -d`)
3. Les migrations sont appliquées (`npx prisma migrate dev`)
4. Le client Prisma est généré (`npx prisma generate`)

### Build errors
Si le build échoue :
1. Supprimez le dossier `.next` : `rm -rf .next`
2. Régénérez Prisma : `npx prisma generate`
3. Réinstallez les dépendances : `pnpm install`

## 📝 Scripts disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Linter ESLint
```

## 📝 License

MIT
