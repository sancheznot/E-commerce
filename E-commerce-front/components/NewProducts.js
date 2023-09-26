import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";

export default function NewProducts({ newProducts }) {
 


  return (
    <>
      <Center>
        <div className="grid grid-cols-1 place-items-center auto-rows-max grid-flow-row bg-black rounded-md w-full min-h-unit-5 p-5">
          <h2 className="text-white text-left w-full text-2xl my-4">
            New Products
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 sm:w-full gap-y-3 bg-gray-300 w-11/12 rounded-xl  place-items-center p-4 ">
            {newProducts?.length > 0 && newProducts.map((product) => {
              return (
                <Link href={`/product/${product._id}`} key={product.id}>
                  <div className="grid sm:grid-cols-2 sm:place-items-center p-2 bg-white sm:w-full gap-1 h-auto max-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
                    <div className="w-[150px] h-[150px]">
                      <Image
                        width={150}
                        height={150}
                        alt={product.name}
                        src={product.images[1]}
                        className="h-full max-full rounded-lg "
                      />
                    </div>
                    <div className="grid mdd:grid-flow-col-dense sm:grid-rows-2 gap-1">
                      <h4 className="text-xs text-gray-500">{product.name}</h4>
                      <h4 className="text-xs text-gray-500">{product.price}</h4>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Center>
    </>
  );
}
