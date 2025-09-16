export const getSingleTour = async (tourData) => {
  
  
};

export default async function singleTourData({ params }) {
  const { id } = await params;
  const singledata = getSingleTour(id);
  return (

    <div>
      
    </div>
  );
}
