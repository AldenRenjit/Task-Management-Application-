<<<<<<< HEAD
const handleCreate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim()) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const { error } = await supabase
    .from("tasks")
    .insert({
      title: title.trim(),
      priority,
      status: "TODO",
      creator_id: user.id,
      team_id: teamId ?? null,
    });

  if (error) {
    console.error(error);
    return;
  }

  setTitle("");
  setPriority("MEDIUM");
  onClose();
=======
const handleCreate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim()) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const { error } = await supabase
    .from("tasks")
    .insert({
      title: title.trim(),
      priority,
      status: "TODO",
      creator_id: user.id,
      team_id: teamId ?? null,
    });

  if (error) {
    console.error(error);
    return;
  }

  setTitle("");
  setPriority("MEDIUM");
  onClose();
>>>>>>> 4835df88119b320e10bcb9bfe7c23adbbcd7ea3c
};