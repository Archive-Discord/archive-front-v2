import React, { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface DropdownProps {
    items: DropDwonItem[],
    selectCallback: (name: DropDwonItem[]) => void,
    isSelecte?: DropDwonItem[],
    label: string,
}

export interface DropDwonItem {
    name: string,
    id: number
}

const DropDown: React.FC<DropdownProps> = ({items, label, selectCallback, isSelecte}) => {
  const [selectedItems, setSelectedItems] = useState<DropDwonItem[]>(isSelecte ? isSelecte : []);

  useEffect(() => {
    selectCallback(selectedItems)
  }, [selectedItems])
  function isSelected(value: DropDwonItem) {
    return selectedItems.find((el) => el.id === value.id) ? true : false;
  }

  function handleSelect(value: any) {
    if (!isSelected(value)) {
      const selectedItemUpdated = [
        ...selectedItems,
        items.find((el) => el.id === value.id)
      ];
      setSelectedItems(selectedItemUpdated);
    } else {
      handleDeselect(value);
    }
  }

  function handleDeselect(value) {
    const selectedPersonsUpdated = selectedItems.filter((el) => el.id !== value.id);
    setSelectedItems(selectedPersonsUpdated);
  }

  return (
    <Listbox 
        value={selectedItems}
        onChange={(value) => handleSelect(value)}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className={`relative w-full h-10 content-center justify-between items-center bg-white border rounded-md shadow-sm pl-4 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500`}>
                    <span className="block truncate w-full pr-3">
                      {selectedItems.length < 1
                        ? label
                        : `${selectedItems.map((el) => el.name).join(", ")}`}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <i className="fas fa-sort text-gray-400" aria-hidden="true" />
                    </span>
            </Listbox.Button>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm dark:bg-battlebot-dark dark:text-white">
              {items.map((item) => {
                      const selected = isSelected(item);
                      return (
                        <Listbox.Option key={item.id} value={item}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-3 pr-9 dark:text-white`}
                            >
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } block truncate dark:text-white`}
                              >
                                {item.name}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-blue-600"
                                  } absolute inset-y-0 right-0 flex items-center pr-4`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}


export default DropDown