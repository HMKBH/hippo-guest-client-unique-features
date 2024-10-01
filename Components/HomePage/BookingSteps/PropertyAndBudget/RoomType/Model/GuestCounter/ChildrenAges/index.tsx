const defaulChildAgeCount = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];

type ChildrenAgesProps = {
  childrenAges: number[];
  handleChildAgeChange: (index: number, value: number) => void;
};

function ChildrenAges(props = {} as ChildrenAgesProps) {
  const { childrenAges, handleChildAgeChange } = props;

  if (childrenAges.length === 0) return null;

  return (
    <>
      <p className="mt-2 text-sm">
        Tell us how old your children will be during checkin.
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {childrenAges.map((selectedAge = -1, index) => (
          <select
            key={selectedAge}
            id=""
            name="age"
            className={`block w-full rounded-sm h-8 border  bg-popover text-popover-foreground pl-1 ${
              selectedAge < 0 ? "border-red-500" : ""
            } `}
            aria-label={`Select child ${index + 1} age`}
            value={selectedAge}
            onChange={(e) =>
              handleChildAgeChange(index, Number(e.target.value))
            }
          >
            <option value={-1}>Age needed</option>
            {defaulChildAgeCount.map((age) => (
              <option key={`${index}-${age}`} value={age}>
                {age} years old
              </option>
            ))}
          </select>
        ))}
      </div>
    </>
  );
}

export default ChildrenAges;
