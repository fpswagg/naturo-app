# 🌿 Naturo

Un site français pour afficher des produits naturels, avis et témoignages, avec un dashboard minimaliste pour la gestion.

## 🛠️ Stack technique

- **Next.js 16** - App Router avec Server Actions
- **TypeScript** - Typage statique
- **TailwindCSS + DaisyUI** - Styling avec palette verte personnalisée
- **Prisma** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données (Docker)
- **Supabase Storage** - Stockage d'images produits (optionnel)

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

## 📁 Structure du projet

```
src/
├── app/
│   ├── (public)/           # Pages publiques
│   │   ├── page.tsx        # Accueil
│   │   ├── produits/       # Liste et détail produits
│   │   └── contact/        # Formulaire de contact
│   └── dashboard/          # Dashboard admin (protégé)
│       ├── products/       # CRUD produits
│       ├── categories/     # CRUD catégories
│       ├── testimonies/    # CRUD témoignages
│       ├── messages/       # Gestion messages
│       └── author/         # Profil auteur
├── actions/                # Server Actions
├── components/             # Composants React
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

## 🗄️ Modèles de données

Voir `prisma/schema.prisma` pour le schéma complet.

## 📝 License

MIT
