interface StarRating {
  id: string;
  numberOfStar: number;
  numberOfProperties: number;
}
interface PropertyType {
  id: number;
  name: string;
}
interface BasisType {
  id: number;
  type: string;
}

type HomePageTypes = {
  final: {
    starRating: StarRating[];
    propertyType: PropertyType[];
    basis: BasisType[];
    // budget:
  };
};
