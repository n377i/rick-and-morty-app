export default function NavButton(buttonName, onClick) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = buttonName;
  button.addEventListener("click", onClick);

  return button;
}
