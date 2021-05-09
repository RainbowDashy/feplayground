import { Center } from "@chakra-ui/layout";
import { useRouter } from "next/router"

export default function Post() {
    const router = useRouter();
    const {pid} = router.query;
    return (
        <Center>
            Post: {pid}
        </Center>
    )
}