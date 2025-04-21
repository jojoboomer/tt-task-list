## Technical Test Resolution (Task List)

## ⚙️ Tech Stack

- **Vite** for fast development and build processes
- **React** for building the user interface
- **Tailwind CSS & Shadcn UI** for styling and components
- **TypeScript** for type safety and modern JavaScript features
- **React Query** for data fetching and caching
- **Supabase** for database management

## 👌 Quick Start

### Cloning the Repository

Run the following commands in your terminal:

```bash
git clone https://github.com/jojoboomer/tt-task-list.git
cd tt-task-list
```

#### 📝 Notes
- I currently have two branches. The `main` branch contains the original version of the app without db. The other branch includes the version with supabase, which is the one I deployed on Netlify. I decided to keep them in separate branches to maintain the `main` branch clean and functional, only using local storage as Front-End solution, but the test solution is in the `supabase` branch.

### Installation

Install the dependencies (I use `yarn` as package manager):

```bash
yarn
```

### Environment Variables

Create a file named `.env` in the project root and add your Supabase credentials and other configuration values:

```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Running the Project

Start the development server:

```bash
npm run dev
```

## 📝 Notes

- I had some trouble checking the url provided http://staging.alldone.app/. I cant create an account, even using VPN. I had to figure out how the site would work. Forgive me if some features are not as expected.

- In description says that badges are touchables but not say how the task is open it. So in my solution i made the task open when i click on it and ignore the touchable badge, If we want to make it touchable we can use anchor instead of span on the hook ```useParseMessage.tsx```, but for that we need implement other way to open the task.

- I cant find the icon for the highlight button, so i used the highlighter icon from my icon library. I dont undestand the icon for estimation sorry, so i used a similar visual icons.

- I used Zustand to manage task status. In the initial phase of the app, i stored tasks in local storage. At the end of the development, i decided to use the supabase database to store them. I decided let Zustand manage the active task status. If the app scales, we can use it for the rest of UI states.