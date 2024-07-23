import React from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

export default function TestSortable() {
  const [items, setItems] = React.useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
  ]);

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex));
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="item">{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  );
}
