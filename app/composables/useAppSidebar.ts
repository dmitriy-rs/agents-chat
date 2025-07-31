export default function useAppSidebar() {
  const isOpen = useState('isSidebarOpen', () => true)

  function toggleSidebar() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    toggleSidebar,
  }
}
