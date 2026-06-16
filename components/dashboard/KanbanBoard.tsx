const [supabase] = useState(() => createClient());

interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  team_id: string | null;
  creator_id: string;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
}

const [tasks, setTasks] = useState<Task[]>([]);

const fetchTasks = useCallback(async () => {
  let query = supabase
    .from("tasks")
    .select("*, profiles!creator_id(full_name, avatar_url)");

  if (teamId) {
    query = query.eq("team_id", teamId);
  } else {
    query = query.is("team_id", null);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return;
  }

  setTasks(data || []);
}, [teamId, supabase]);

const onDragEnd = async (result: DropResult) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const updatedTasks = tasks.map((task) =>
    task.id === draggableId
      ? { ...task, status: destination.droppableId as Task["status"] }
      : task
  );

  setTasks(updatedTasks);

  const { error } = await supabase
    .from("tasks")
    .update({
      status: destination.droppableId,
    })
    .eq("id", draggableId);

  if (error) {
    console.error(error);
    fetchTasks();
  }
};